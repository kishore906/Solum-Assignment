import java.util.Scanner;

/*
--- Mystics waves ---

Reads t test cases. For each test case reads integers x and n,
then prints the total energy after n alternating waves starting with x

Logic: if n is even, total = 0; if n is odd, total = x
*/

public class MysticWaves {
    // Helper method that checks for valid inputs of (t, x, n)
    private static int readIntInRange(Scanner sc, String prompt, int min, int max){
        int value;

        while(true){
            System.out.println(prompt);

            if(sc.hasNextInt()){
                value = sc.nextInt();
                if(value >= min && value <= max){
                    break; // valid input
                }else{
                    System.out.println("Error: value must be between " + min + " and " + max + ". Try again.");
                }
            }else{
                System.out.println("Error: Invalid input. Please enter an integer.");
                sc.next(); // discard invalid input
            }
        }

        return value;
    }

    public static void main(String[] args){
        // Scanner to read from standard input
        Scanner sc = new Scanner(System.in);

        // read number of test cases t(1 <= t <= 100)
        int t = readIntInRange(sc, "Enter number of test cases (1 <= t <= 100):", 1, 100);

        // looping over each testcase
        for(int testCase = 0; testCase < t; testCase++){
            // Read x and n for each test case (1 <= x, n <= 10)
            int x = readIntInRange(sc, "Enter the value of x (1 <= x <= 100):", 1, 100); // energy value

            int n = readIntInRange(sc, "Enter the value of n (1 <= n <= 100):", 1, 100); // number of waves


            // If n is even, all waves cancel pair wise(x, -x), means total = 0
            // If n is odd, there is one extra x(positive), means total = x
            int totalEnergy;

            if(n % 2 == 0){
                totalEnergy = 0;
            }else{
                totalEnergy = x;
            }

            // printing the total energy for each test case
            System.out.println("Total Energy for test case " + (testCase + 1) + ": " + totalEnergy);
        }

        // close the scanner
        sc.close();
    }
}
