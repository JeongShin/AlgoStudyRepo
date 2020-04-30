# Graphs
### 1. Essential Graph Terms
* __Vertex__ : a node 
* __Edge__ : connection between Nodes
* __Weighted/ Unweighted__ : values assigned to distances between vertices 
* __Directed/ Undirected__ : direction assigned to distanced between vertices
### 2. Types of Graphs
* __Undirected Graph__    
Ex) Facebook Friend Relation
* Directed Grpah  
Ex) Instagram Followers
* Weighted Graph   
Ex) Map with distance
* Unweighted Graph   
Ex) No value in Edge

### 3. BIG-O Compare
| Operation | Adjacency List | Adjacency Matrix |
| :----------: | :---------: | :----------: |
| Add Vertex    | O(1)       |     O(V^2)   |
| Add Edge    | O(1)       |     O(1)   |
| Remove Vertex    | O(V+E)       |     O(V^2)   |
| Remove Edge    | O(E)       |     O(1)   |
| Query    | O(V+E)       |     O(1)         |
| Storage    | O(V+E)       |     O(V^2)         |

### 4. Pro and Cons
| Adjacency List | Adjacency Matrix |
| :---------: | :----------: |
| <span style="color:green">Less Space</span>   |     <span style="color:red">More Space</span>   | 
| <span style="color:green">Fast Edge Iterate</span>   | <span style="color:red">Slow Edge Iterate</span>       | 
| <span style="color:red">Slow Edge Lookup</span>    | <span style="color:green">Fast Edge Lookup</span>    | 


