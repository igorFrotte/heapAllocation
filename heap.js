const N_Heap = 20;
const heap = new Array(N_Heap).fill(true);
const pointers = [];
let emptySpaces = null;
const strategy = {}; // cada um é uma função

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

strategy['first'] = firstSpace;

const removePointer = (name) => {//mudar
    for(let i = 0; i < pointers.length; i++){
        if(pointers[i] != null){
            if(pointers[i].name === name){
                let obj = pointers[i];
                pointers[i] = null;
                return obj;
            }
        }
    }
    return null;
};

const freeUpSpace = (list, obj) => {
    if(list.init > obj.init){
        const newNode = createList(obj.init, obj.length);
        newNode.next = list;
        return newNode;
    }
    list.next = freeUpSpace(list.next, obj);
    return list;
};

const adjustSpace = (list) => {
    if(list === null)
        return null;
    if(list.next != null){
        if(list. init + list.length === list.next.init){
            list.length += list.next.length;
            list.next = list.next.next;
            adjustSpace(list);
            return list;
        } 
    }
    adjustSpace(list.next);
    return list;
};

const instruction = (command) => {
    const parts = command.split(" ");
    if(parts[0] === "new"){
        const length = Number(parts[2]);
        let index = strategy['first'](emptySpaces, length);
        if(index != -1){
            let newPointer = createPointer(parts[1], index,  length);   
            pointers.push(newPointer);
            heap.fill(false, index, index + length);
        } else
            console.log("Não existe espaço vago para essa alocação.");
    }
    if(parts[0] === "del"){
        const obj = removePointer(parts[1]);
        if(obj){
            emptySpaces = freeUpSpace(emptySpaces, obj);
            emptySpaces = adjustSpace(emptySpaces);
            heap.fill(true, obj.init, obj.init + obj.length);
        } else
        console.log("Este elemento não existe.");
    }
    
};

emptySpaces = createList(0,N_Heap);

instruction("new a 5");
instruction("new b 3");
instruction("new c 8");
instruction("del b");
show();
instruction("del c");
instruction("del a");
/* instruction("b = a");
instruction("new d 2");
instruction("del b"); */
show();
