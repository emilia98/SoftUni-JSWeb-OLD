export class CategoryModel {
    constructor(
        public title :string,
        public slug :string,
        public parentCategory :Object,
        public icon :string
    ) { }
}