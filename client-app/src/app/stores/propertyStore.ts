import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Property } from "../models/property";
import {v4 as uuid} from 'uuid';
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
        try{
            const properties = await agent.Properties.list();
                properties.forEach(property => {
                    property.pDate = property.pDate.split('T')[0];
                    this.propertyRegistry.set(property.id, property);
                  })
                  this.setLoadingInitial(false);
            
        } catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;

    }

    selectProperty = (id: string) => {
        this.selectedProperty = this.propertyRegistry.get(id);
    }

    cancelSelectedProperty = () => {
        this.selectedProperty = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectProperty(id) : this.cancelSelectedProperty();
        this.editMode = true; 
    }
    closeForm = () => {
        this.editMode = false;
    }

    createProperty = async (property: Property) => {
        this.loading = true;
        property.id = uuid();
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
                if (this.selectedProperty?.id === id) this.cancelSelectedProperty();
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