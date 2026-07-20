import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter Name: ");
        String name = sc.nextLine();

        int total = 0;

        for (int i = 1; i <= 3; i++) {
            System.out.print("Enter Mark " + i + ": ");
            total += sc.nextInt();
        }

        double avg = total / 3.0;

        System.out.println("Name: " + name);
        System.out.println("Total: " + total);
        System.out.println("Average: " + avg);

        if (avg >= 50)
            System.out.println("Pass");
        else
            System.out.println("Fail");
    }
}