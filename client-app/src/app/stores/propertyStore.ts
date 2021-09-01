import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Property } from "../models/property";
export default class PropertyStore{
   propertyRegistry = new Map<string, Property>();
   selectedProperty: Property | undefined = undefined;
   editMode = false;
   loading = false;
   loadingInitial = true;


    constructor() {
        makeAutoObservable(this)
    }

    get propertiesByDate() {
        return Array.from(this.propertyRegistry.values()).sort((a, b) =>
             Date.parse(a.pDate) - Date.parse(b.pDate));
    }

    loadProperties =async () => {
        this.loadingInitial = true;
        try{
            const properties = await agent.Properties.list();
            properties.forEach(property => {
                this.setProperty(property);
            })
            this.setLoadingInitial(false);
            
        } catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadProperty = async (id: string) => {
        let property = this.getProperty(id);
        if(property) {
            this.selectedProperty = property;
            return property;
        } else{
            this.loadingInitial = true;
            try{
                property = await agent.Properties.details(id);
                this.setProperty(property);
                runInAction(() =>{
                    this.selectedProperty = property;
                })
                this.setLoadingInitial(false);
                return property;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setProperty = (property: Property) => {
        property.pDate = property.pDate.split('T')[0];
        this.propertyRegistry.set(property.id, property);

    }

    private getProperty =(id: string) => {
        return this.propertyRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;

    }

    createProperty = async (property: Property) => {
        this.loading = true;
        try{
            await agent.Properties.create(property);
            runInAction(() => {
                this.propertyRegistry.set(property.id, property);
                this.selectedProperty = property;
                this.editMode = false;
                this.loading = false;
            })
        }catch (error) {
            console.log(error); 
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateProperty =  async (property: Property) => {
        this.loading = true;
        try{
            await agent.Properties.update(property);
            runInAction(() => {
                this.propertyRegistry.set(property.id, property);
                this.selectedProperty = property;
                this.editMode = false;
                this.loading = false;
            })
        }catch (error) {
            console.log(error); 
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteProperty = async (id: string) => {
        this.loading = true;
        try{
            await agent.Properties.delete(id);
            runInAction(() => {
                this.propertyRegistry.delete(id);
                this.loading = false;
            })

        }catch (error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
  
}