export class CreateModel {
    constructor(
        public make :string,
        public model :string,
        public year :string,
        public description :string,
        public price :string,
        public image :string,
        public material? :string
    ) {}
}