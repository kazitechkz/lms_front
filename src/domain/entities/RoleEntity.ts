export class RoleEntity {
    constructor(
        public id: number,
        public titleRu: string,
        public titleKk: string,
        public value: string,
        public canRegister: boolean,
        public isAdmin: boolean,
        public createdAt: Date,
        public updatedAt: Date,
        public titleEn?: string
    ) {}
}

