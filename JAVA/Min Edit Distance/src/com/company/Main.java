/* DKU - Algorithm 4번 과제
 *
 * 32162417 소프트웨어 신정웅
 *
 * 문제 : 그리디 알고리즘을 통한 최소 비용 문자열 편집 구현
 *
 * Cost for operation
 *  Insertion  : 1
 *  Deletion : 1
 *  Change : 2
 *
 * Created by JeongShin
 *
 * */

package com.company;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class Main {

    /* Global Variable */
    static int lenX;
    static int lenY;
    static s[][] table;


    /* Class Implementation */
    public static class s {
        String data;
        int weight;
        int x_pos;
        int y_pos;

        public s(String s, int weight, int x_pos, int y_pos) {
            this.data = s;
            this.weight = weight;
            this.x_pos = x_pos;
            this.y_pos = y_pos;
        }
    }

    /* Initialize Table Method */
    public static s[][] init_table(String x, String y) {
        s[][] table = new s[lenX + 1][lenY + 1];
        for (int i = 0; i <= lenX; i++) {
            String xpart = x.substring(i);
            for (int j = 0; j <= lenY; j++) {
                String ypart = y.substring(0, j);
                if (i == 0 || j == 0) {
                    table[i][j] = new s(ypart + xpart, Math.max(i, j), i, j);
                    continue;
                }
                int weight_up = table[i - 1][j].weight + 1;
                int weight_left = table[i][j - 1].weight + 1;
                int weight_diagonal = table[i - 1][j - 1].data.equals(ypart + xpart) ? table[i - 1][j - 1].weight : table[i - 1][j - 1].weight + 2;

                int min = Math.min(weight_left, Math.min(weight_up, weight_diagonal));
                table[i][j] = new s(ypart + xpart, min, i, j);
            }
        }
        return table;
    }

    /* Print Table Method */
    public static void print_table(s[][] table) {
        for (s[] el : table) {
            for (s val : el) {
                if (val != null) {
                    String out = val.data + " : " + val.weight;
                    System.out.print(String.format("%15s", out));
                }
            }
            System.out.println();
        }
    }

    /* ArrayList 의 path 를 생성한 후 dfs 경로 탐색에 dest vertex 를 인자로 건네 주고
     * path 는 dest -> start 로 역추적하기 때문에 path 를 reverse 하여 return 합니다
     * */
    public static ArrayList<String> backtrack(s dest) {
        ArrayList<String> path = new ArrayList<>();
        dfs(dest, path);
        Collections.reverse(path);
        return path;
    }

    /* Depth First Search  원리로
     * destination : table [lenX] [lenY]  -> start : table [0] [0]
     * 으로 path 를 역추적 합니다
     * */
    public static s dfs(s vertex, ArrayList<String> path) {

        if (vertex.x_pos == 0 && vertex.y_pos == 0) {
            path.add(vertex.data);
            return vertex;
        }

        path.add(vertex.data);

        if (vertex.x_pos == 0)
            return dfs(table[0][vertex.y_pos - 1], path);
        if (vertex.y_pos == 0)
            return dfs(table[vertex.x_pos - 1][0], path);

        s diagonal = table[vertex.x_pos - 1][vertex.y_pos - 1];
        if (vertex.weight == diagonal.weight)
            return dfs(diagonal, path);

        s up = table[vertex.x_pos][vertex.y_pos - 1];
        if (vertex.weight - 1 == up.weight)
            return dfs(up, path);

        s left = table[vertex.x_pos - 1][vertex.y_pos];
        if (vertex.weight - 1 == left.weight)
            return dfs(left, path);

        return null;
    }

    /* x 와 path 의 시작 부분의 문자열이 일치하는지 y 와 path 의 끝부분의 문자열이 일치하는지 결과를 출력 합니다 */
    public static void is_path_valid(ArrayList<String> path, String x, String y) {
        String start = path.get(0);
        String end = path.get(path.size() - 1);
        System.out.println("x " + x + " equals " + "path start " + start + " : " + x.equals(start));
        System.out.println("y " + y + " equals " + "path end " + end + " : " + y.equals(end));
    }

    public static void main(String[] args) {
        System.out.println("Minimum Edit Distance Program");

        Scanner scanner = new Scanner(System.in);
        /* 사용자로부터 문자열과 문자열의 길이를 입력 받습니다. */
        System.out.println("Enter length of string for x : ");
        lenX = Integer.parseInt(scanner.nextLine());
        System.out.println("Enter length of string for y : ");
        lenY = Integer.parseInt(scanner.nextLine());

        /* x,y의 String을 입력 받습니다. 만약 입력 받은 문자열의 길이가 더 짧은 경우 */
        System.out.println("Enter string x : ");
        String x = scanner.nextLine();
        lenX = Math.min(lenX, x.length());

        System.out.println("Enter string y : ");
        String y = scanner.nextLine();
        lenY = Math.min(lenY, y.length());

        /* 지정된 문자열의 길이만큼 문자열을 자릅니다 */
        x = x.substring(0, lenX);
        y = y.substring(0, lenY);

        /* x, y로 weight table 을 생성 합니다 */
        table = init_table(x, y);

        /* table 을 출력 합니다 */
        System.out.println();
        print_table(table);

        /* 목적지 string 은 table 기준 오른쪽 맨 하단에 위치 합니다 */
        s dest = table[lenX][lenY];

        /* 도착지까지의 경로를 역 추적 합니다 */
        ArrayList<String> path = backtrack(dest);

        /* Path 를 출력 합니다 */
        System.out.println(path);

        /* Path 의 validation 을 검사 합니다 */
        is_path_valid(path, x, y);

    }
}
