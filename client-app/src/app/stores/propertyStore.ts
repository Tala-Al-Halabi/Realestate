import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Property } from "../models/property";
export default class PropertyStore{
   propertyRegistry = new Map<string, Property>();
   selectedProperty: Property | undefined = undefined;
   editMode = false;
   loading = false;
   loadingInitial = false;


    constructor() {
        makeAutoObservable(this)
    }

    get propertiesByDate() {
        return Array.from(this.propertyRegistry.values()).sort((a, b) =>
            a.pDate!.getTime() - b.pDate!.getTime());
    }

    get groupedProperties() {
        return Object.entries(
            this.propertiesByDate.reduce((properties, property) => {
                const date = format(property.pDate!, 'dd MMM yyyy');
                properties[date] = properties[date] ? [...properties[date], property] : [property];
                return properties;
            }, {} as {[key: string]: Property[]})
        )
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
        property.pDate = new Date(property.pDate!);
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