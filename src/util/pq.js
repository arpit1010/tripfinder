class PriorityQueue {
    
  
    constructor() {
      this.nodes = [];
    }
  
    add(key, priority) {
      this.nodes.push({key, priority});
      this.sort();
    }
  
    ejectSmallest = () => this.nodes.shift().key;
  
    isEmpty = () => !this.nodes.length;
  
    sort() {
      this.nodes.sort((a, b) => a.priority - b.priority);
    }
  }
  
  export default PriorityQueue