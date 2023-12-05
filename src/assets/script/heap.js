const N_Heap = 20;
export const heap = new Array(N_Heap).fill(true);
export const pointers = [];
let emptySpaces = null;
const strategy = {}; 
export let method = "best"; 

export const setMethod = (value) => {
    method = value;
};

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
        if(list.next.length === x){
            list.next = list.next.next;
            return list.init;
        }
    }
    return firstSpace(list.next);
};

const nextSpace = (list, x) => {
    const last = pointers[pointers.length - 1];
    if(!last || list === null)
        return firstSpace(list, x);
    if(last.init + last.length === list.init){
        const index = firstSpace(list, x);
        if(index !== -1)
            return index;
        return firstSpace(emptySpaces, x);
    } 
    return nextSpace(list.next, x);
};

const removeNode = (index, length, list) => {
    if(list === null)
        return null;
    if(list.init === index){
        if(list.length === length)
            return list.next;
        list.init += length;
        list.length -= length;
        return list;
    }
    list.next = removeNode(index, length, list.next);
    return list;
};

const bestSpace = (list, x, find = -1, length = N_Heap + 1) => {
    if(list === null){
        if(find !== -1)
            emptySpaces = removeNode(find, x, emptySpaces);
        return find;
    }
    if(list.length === x){
        const aux = list.init;
        emptySpaces = removeNode(list.init, x, emptySpaces);
        return aux;
    }
    if(list.length > x)
        if(list.length < length)
            return bestSpace(list.next, x, list.init, list.length);
    return bestSpace(list.next, x, find, length);
};

const worstSpace = (list, x, find = -1, length = 0) => {
    if(list === null){
        if(find !== -1)
            emptySpaces = removeNode(find, x, emptySpaces);
        return find;
    }
    if(list.length === x){
        const aux = list.init;
        emptySpaces = removeNode(list.init, x, emptySpaces);
        return aux;
    }
    if(list.length > x)
        if(list.length > length)
            return worstSpace(list.next, x, list.init, list.length);
    return worstSpace(list.next, x, find, length);
};

strategy['first'] = firstSpace;
strategy['best'] = bestSpace;
strategy['worst'] = worstSpace;
strategy['next'] = nextSpace;

const removePointer = (name) => {
    for(let i = 0; i < pointers.length; i++){
        if(pointers[i].names.includes(name)){
            let obj = pointers[i];
            pointers.splice(i, 1);
            return obj;
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
        if(list.init + list.length === list.next.init){
            list.length += list.next.length;
            list.next = list.next.next;
            adjustSpace(list);
            return list;
        } 
    }
    adjustSpace(list.next);
    return list;
};

export const instruction = (command) => {
    const parts = command.split(" ");
    if(parts[0] === "new"){
        if(findPointer(parts[1]) !== null)
            return;
        const length = Number(parts[2]);
        let index = strategy[method](emptySpaces, length);
        if(index !== -1){
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

/* instruction("new a 2");
instruction("new b 4"); 
instruction("new d 5");
instruction("new f 3");
instruction("k = f");
instruction("m = a");
instruction("new g 2");
instruction("del b");
instruction("del k"); 
instruction("new e 2");
instruction("new h 3");
instruction("exibe"); */