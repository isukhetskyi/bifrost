export class RespondentModel{
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    isEmployed: boolean;
    currentPossition: string;
    phone: string;
    skype: string;
    email: string;
    placeOfStudying: string;
    speciality: string;
    technologies: string;
    otherInfo: string;
    createdDate: string;

    constructor(){
        this.id= -1;
        this.firstName = "";
        this.lastName = "";
        this.age = -1;
        this.address = "";
        this.isEmployed = false;
        this.currentPossition = "";
        this.phone = "";
        this.skype = "";
        this.email = "";
        this.placeOfStudying = "";
        this.speciality = "";
        this.technologies = "";
        this.otherInfo = "";
        this.createdDate = "";
    }
}

export default RespondentModel;