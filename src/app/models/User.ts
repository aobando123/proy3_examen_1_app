import Tag from 'src/app/models/Tag';
export default  interface User {
    id?:number;
    nickname: string;
    preferences: Tag[];
}
