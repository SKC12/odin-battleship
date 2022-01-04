import "./style.css";
import { Ship } from "./ship";

console.log(Ship(2).getHealth());

let A = Ship(2);
console.log(A.getHealth());
A.hit(1);
console.log(A.getHealth());
A.hit(0);
console.log(A.getHealth());

let B = Ship(3);
console.log(B.getHealth());
