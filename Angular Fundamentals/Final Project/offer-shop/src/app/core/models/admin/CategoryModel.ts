export class CategoryModel {
    constructor(
        public title :string,
        public slug :string,
        public parentCategory :string,
        public icon :string
    ) { }
}