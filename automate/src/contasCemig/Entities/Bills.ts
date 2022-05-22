class Bills {
    private id: Number;
    private value: Number;
    private dueDate: String;
    private type: String;

    constructor(id: Number, value: Number, dueDate: String, type: String){
        this.id = id;
        this.value = value;
        this.dueDate = dueDate;
        this.type = type;
    }

    public getId(): Number {
        return this.id;
    }

    public getValue(): Number {
        return this.value;
    }

    public getDueDate(): String {
        return this.dueDate;
    }

    public getType(): String {
        return this.type;
    }

    public setValue(newValue: number): void {
        this.value = newValue;
    }

    public setDueDate(newDueDate: String): void {
        this.dueDate = newDueDate;
    }

    public setType(newType: String): void {
        this.type = newType;
    }
}

export default Bills;