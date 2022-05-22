interface Interactor {
    insert(...args): void;
    remove(...args): boolean;
    update(...args): boolean;

    find(...args): any;
    findByPk(primaryKey: any): any;

    save(content: any): any;
    load(): any;
}

export default Interactor;