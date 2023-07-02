import ENUM from './ENUM';

class GenderENUM extends ENUM{
    static fields = [
        ...this.fields,
        "Male",
        "Female",
    ]
    

    
}

export default GenderENUM;