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
        names: nam,
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

const removePointer = (name) => {
    for(let i = 0; i < pointers.length; i++){
        if(pointers[i] != null){
            if(pointers[i].names.includes(name)){
                let obj = pointers[i];
                pointers[i] = null;
                return obj;
            }
        }
    }
    return null;
};

const findPointer = (name) => {
    for(let i = 0; i < pointers.length; i++)
        if(pointers[i] != null)
            if(pointers[i].names.includes(name))
                return pointers[i];
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
            let newPointer = createPointer([parts[1]], index, length);   
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
    if(parts[1] === "="){
        if(!findPointer(parts[0])){
            let target = findPointer(parts[2])
            if(target){
                target.names.push(parts[0]);
            } else
                console.log("Elemento alvo não existe.");
        } else
        console.log("Este elemento já existe. Use o comando del para deletar.");
    }
    if(parts[0] === "exibe")
        show();
};

emptySpaces = createList(0,N_Heap);

instruction("new a 5");
instruction("new b 3");
instruction("new c 8");
instruction("del b");
show();
instruction("del c");
instruction("b = a");
show();
instruction("new d 2");
instruction("del b");
instruction("exibe");
