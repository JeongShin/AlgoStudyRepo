import java.io.*;
import java.util.*;

/*
 * DKU - Algorithm 3번 과제
 *
 * 32162417 소프트웨어 신정웅
 *
 * 문제: 텍스트 파일을 이용한 허프만 트리 구현
 *
 * String은 모두 알파벳이고 소문자라는 가정하에 구현하였습니다.
 *
 * */

public class Huffman {
    static class node implements Comparable<node> {
        private String data;
        private int count;
        private node left;
        private node right;
        public String code;

        public node(String data, int count) {
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
        char[] buff = new char[5000];
        int buff_count = 0;
        System.out.println("Choose file name to read 1. LoremIpsum\t2. CNN news\t3. Wikipedia Document");
        Scanner scanner = new Scanner(System.in);
        int option = scanner.nextInt();
        String path;
        switch (option) {
            case 1:
                path = "LoremIpsum.txt";
                break;
            case 2:
                path = "CNN_Coronavirous.txt";
                break;
            case 3:
                path = "Wiki.txt";
                break;
            default:
                System.out.println("Invalid Option");
                return;
        }
        File file = new File(path);
        try {
            try {
                FileReader fr = new FileReader(file);
                int curr;
                while ((curr = fr.read()) != -1) {
                    if ((65 <= curr) && (curr <= 90) || ((97 <= curr) && (122 >= curr)) || (curr == 32)) {
                        if (curr != 32 && curr <= 90)
                            curr += 32;
                        buff[buff_count++] = (char) curr;
                    }
                }
                fr.close();
            } catch (FileNotFoundException e) {
                e.getStackTrace();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        // Only for lowercase alphabet
        int[] data_count = new int[27];

        List<node> huff_nodes = new ArrayList<>();
        // 1. Get Count for each alphabet
        for (int i = 0; i < buff_count; i++) {
            int idx = (int) buff[i] == 32 ? 26 : (int) buff[i] - 97;
            data_count[idx]++;
        }
        // 1 - 1. Create Nodes for Tree
        for (int i = 0; i < 27; i++) {
            if (data_count[i] != 0) {
                huff_nodes.add(new node(i != 26 ?
                        Character.toString((char) (i + 97)) : "SPACE"
                        , data_count[i]));
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
            node right = huff_tree.root_;

            // isMin to check root is min in Queue
            boolean isMin = true;
            for (node curr : node_queue)
                isMin = curr.count > right.count;

            // if root is not min create new subtree & enqueue this root
            if (!isMin) {
                node_queue.offer(right);
                right = node_queue.poll();
            }

            node left = node_queue.poll();

            // Unless String Length is less than 2 (which is no meaning of HuffmanCode),
            // tree will have at least 2 nodes
            assert left != null && right != null;

            // Non-leaf Nodes do not have data (char) to save
            node parent = new node(" ", left.count + right.count);

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
        while (!node_queue.isEmpty()) {
            node curr = node_queue.poll();
            // Case 2. curr -> right child : current code + "1"
            if (curr.right != null) {
                curr.right.code = curr.code + "1";
                node_queue.offer(curr.right);
            }
            // Case 1. curr -> left child : current code + "0"
            if (curr.left != null) {
                curr.left.code = curr.code + "0";
                node_queue.offer(curr.left);
            }
        }

        // Print Huffman Code Result
        System.out.println("\nHuffman Code Result");
        for (node curr : huff_nodes)
            System.out.println(curr.data + " : " + curr.code);
    }
}