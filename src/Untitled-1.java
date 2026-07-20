import java.util.*;

class Student {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Name: ");
        String name = sc.nextLine();

        System.out.print("Marks (3): ");
        int m1 = sc.nextInt(), m2 = sc.nextInt(), m3 = sc.nextInt();

        int total = m1 + m2 + m3;
        double avg = total / 3.0;

        System.out.println("Name: " + name);
        System.out.println("Total: " + total);
        System.out.println("Average: " + avg);

        if (avg >= 50)
            System.out.println("Grade: Pass");
        else
            System.out.println("Grade: Fail");
    }
}