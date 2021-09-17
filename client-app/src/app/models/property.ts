import { Profile } from "./profile";


    export interface Property {
        id: string;
        pType: string;
        title: string;
        about: string;
        whytoInvest: string;
        size: string;
        bedrooms: string;
        bathrooms: string;
        pricePersqm: string;
        location: string;
        pDate: Date | null;
        iType: string;
        investnow: string;
        price: string;
        hostUsername: string;
        isCancelled: boolean;
        isInvesting: boolean;
        isHost: boolean;
        host?: Profile;
        investors: Profile[]
    }

    export class Property implements Property {
        constructor(init?: PropertyFormValues) {
            Object.assign(this, init);
        }
    }

    export class PropertyFormValues {
        id?: string = undefined;
        pType: string = '';
        title: string = '';
        about: string = '';
        whytoInvest: string = '';
        size: string = '';
        bedrooms: string = '';
        bathrooms: string = '';
        pricePersqm: string = '';
        location: string = '';
        pDate: Date | null = null;
        iType: string = '';
        investnow: string = '';
        price: string = '';

        constructor(property?: PropertyFormValues) {
            if (property) {
                this.id = property.id;
                this.title = property.title;
                this.pType = property.pType;
                this.about = property.about;
                this.whytoInvest = property.whytoInvest;
                this.size = property.size;
                this.bedrooms = property.bedrooms;
                this.bathrooms = property.bathrooms;
                this.pricePersqm = property.pricePersqm;
                this.location = property.location;
                this.pDate = property.pDate;
                this.iType = property.iType;
                this.investnow = property.investnow;
                this.price = property.price
            }
        }
    }

