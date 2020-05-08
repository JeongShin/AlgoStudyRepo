import java.util.*;

/*
 * DKU - Algorithm 출석 과제
 *
 * 32162417 소프트웨어 신정웅
 *
 * 문제: 허프만 트리 구현
 *
 * String은 모두 알파벳이고 소문자라는 가정하에 구현하였습니다.
 *
 * */

public class Huffman {
    static class node implements Comparable<node> {
        private char data;
        private int count;
        private node left;
        private node right;
        public String code;
        public node(char data, int count) {
            this.data = data;
            this.count = count;
            this.code = "";
            left = right = null;
        }
        @Override
        public int compareTo(node o) {
            return this.count - o.count;
        }

    }
    static class tree {
        private node root_;

        public tree(node root) {
            this.root_ = root;
        }
    }

    public static void main(String[] args) {
        String s = "abbcdefaabbcddefcdbadd";
        char[] data = s.toCharArray();
        // Only for lowercase alphabet
        int[] data_count = new int[26];
        List<node> huff_nodes = new ArrayList<>();

        // 1. Get Count for each alphabet
        for (int i = 0; i < s.length(); i++) {
            int idx = (int) data[i] - 97;
            data_count[idx]++;
        }
        // 1 - 1. Create Nodes for Tree
        for (int i = 0; i < 26; i++) {
            if (data_count[i] != 0) {
                huff_nodes.add(new node((char) (i + 97), data_count[i]));
            }
        }

        // 2. Build Tree
        // 2 - 1. Sort Nodes least count -> most count
        Collections.sort(huff_nodes);

        // Initialize Queue to build tree & enqueue nodes
        Queue<node> node_queue = new LinkedList<>();

        // Print count (frequency) for each nodes
        System.out.println("Frequency for each alphabet");
        for (node curr : huff_nodes) {
            System.out.print(curr.data + " : " + curr.count + "\t");
            node_queue.offer(curr);
        }
        // 2 - 2. Build Tree
        tree huff_tree = new tree(node_queue.poll());

        while (!node_queue.isEmpty()) {

            // Initialize left node to root
            node left = huff_tree.root_;

            // isMin to check root is min in Queue
            boolean isMin = true;
            for (node curr : node_queue)
                isMin = curr.count > left.count;

            // if root is not min create new subtree & enqueue this root
            if (!isMin) {
                node_queue.offer(left);
                left = node_queue.poll();
            }

            node right = node_queue.poll();

            // Unless String Length is less than 2 (which is no meaning of HuffmanCode),
            // tree will have at least 2 nodes
            assert left != null && right != null;

            // Non-leaf Nodes do not have data (char) to save
            node parent = new node((char)0, left.count + right.count);

            // Set pointers for parent node
            parent.left = left;
            parent.right = right;

            // Reset root
            huff_tree.root_ = parent;
        }

        // 3. Level Order Traversal -> Get Code
        // Insert Root
        node_queue.offer(huff_tree.root_);

        // Visit nodes level order & update code
        while (!node_queue.isEmpty()){
            node curr = node_queue.poll();
            // Case 1. curr -> left child : current code + "0"
            if(curr.left!=null) {
                curr.left.code=curr.code.concat("0");
                node_queue.offer(curr.left);
            }

            // Case 2. curr -> right child : current code + "1"
            if(curr.right != null) {
                curr.right.code=curr.code.concat("1");
                node_queue.offer(curr.right);
            }
        }
        // Print Huffman Code Result
        System.out.println("\nHuffman Code Result");
        for(node curr : huff_nodes)
            System.out.println(curr.data + " : " + curr.code);
    }
}