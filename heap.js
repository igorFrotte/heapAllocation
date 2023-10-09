const N_Heap = 20;
const heap = new Array(N_Heap).fill(true);
const pointers = [];
let emptySpaces = null;
const strategy = []; // cada um é uma função

const createList = (ini, leng) => {
    return {
        init: ini,
        length: leng,
        next: null
    };
};

const createPointer = (nam, ini, leng) => {
    return {
        name: nam,
        init: ini,
        length: leng        
    };
};

const show = () => {
    console.log(heap);
    console.log(pointers);
    console.log(emptySpaces);
};

const firstSpace = (list, x) => {
    if(list === null)
        return -1;
    if(list.length >= x){
        let index = list.init;
        list.length -= x;
        list.init += x;
        return index;
    }
    if(list.next != null){
        if(list.next.length > x){
            let index = list.next.init;
            list.next.length -= x;
            list.next.init += x;
            return index;
        }
        if(list.next.length == x){
            list.next = list.next.next;
            return list.init;
        }
    }
    firstSpace(list.next);
};

const instruction = (command) => {
    const parts = command.split(" ");
    if(parts[0] === "new"){
        const length = Number(parts[2]);
        let index = firstSpace(emptySpaces, length);
        if(index != -1){
            let newPointer = createPointer(parts[1], index,  length);
            pointers.push(newPointer);
            heap.fill(false, index, index + length);
        } else {
            console.log("Não existe espaço vago para essa alocação.");
        }
    }
};

emptySpaces = createList(0,N_Heap);

instruction("new a 5");
instruction("new b 3");
instruction("new c 8");
/* instruction("del b");
instruction("b = a");
instruction("new d 2");
instruction("del b"); */
show();
