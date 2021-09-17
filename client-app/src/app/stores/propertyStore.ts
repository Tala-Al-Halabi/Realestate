import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "../models/profile";
import { Property, PropertyFormValues } from "../models/property";
import { store } from "./store";
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
        const user = store.userStore.user;
        if (user) {
            property.isInvesting = property.investors!.some(
                a => a.username === user.username
            )
            property.isHost = property.hostUsername === user.username;
            property.host = property.investors?.find( x => x.username === property.hostUsername);
        }
        property.pDate = new Date(property.pDate!);
        this.propertyRegistry.set(property.id, property);

    }

    private getProperty =(id: string) => {
        return this.propertyRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;

    }

    createProperty = async (property: PropertyFormValues) => {
        const user = store.userStore.user;
        const investor = new Profile(user!);
        try{
            await agent.Properties.create(property);
            const newProperty = new Property(property);
            newProperty.hostUsername = user!.username;
            newProperty.investors = [investor];
            this.setProperty(newProperty);
            runInAction(() => {
                this.selectedProperty = newProperty;
            })
        }catch (error) {
            console.log(error); 
        }
    }

    updateProperty =  async (property: PropertyFormValues) => {
        try{
            await agent.Properties.update(property);
            runInAction(() => {
                if(property.id) {
                    let updatedProperty = {...this.getProperty(property.id), ...property}
                    this.propertyRegistry.set(property.id, updatedProperty as Property);
                    this.selectedProperty = updatedProperty as Property;
                }
            })
        }catch (error) {
            console.log(error); 
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

    updateInvestment = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Properties.invest(this.selectedProperty!.id);
            runInAction(() => {
                if (this.selectedProperty?.isInvesting) {
                    this.selectedProperty.investors = 
                        this.selectedProperty.investors?.filter(a => a.username !== user?.username);
                    this.selectedProperty.isInvesting = false;
                } else {
                    const investor = new Profile(user!);
                    this.selectedProperty?.investors?.push(investor);
                    this.selectedProperty!.isInvesting = true;
                }
                this.propertyRegistry.set(this.selectedProperty!.id, this.selectedProperty!)
            })
        }catch (error) {
            console.log(error);
        }finally {
            runInAction(() => this.loading = false);
        }
    }

    cancelPropertyToggle = async () => {
        this.loading = true;
        try{
            await agent.Properties.invest(this.selectedProperty!.id);
            runInAction(() => {
                this.selectedProperty!.isCancelled = !this.selectedProperty?.isCancelled;
                this.propertyRegistry.set(this.selectedProperty!.id, this.selectedProperty!);
            })
        }catch (error) {
            console.log(error);
        }finally{
            runInAction(() => this.loading = false);
        }
    }
  
}