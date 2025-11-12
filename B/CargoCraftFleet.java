import java.util.Scanner;

/*
 ---- CargoCraft Fleet ---

 For each test case with total propulsion units n, computes:
 --> minimum possible number of crafts
 --> maximum possible number of crafts

 we are solving 4a + 6b = n

 If impossible, prints -1.
 */
public class CargoCraftFleet {
    public static long[] solveMinMaxCrafts(long n){
        if(n % 2 != 0 || n < 4){
            return new long[]{-1, -1};
        }

        // Simplified 4a + 6b = n => 2a + 3b = n/2 by dividing with 2
        long halfNValue = n / 2;

        // For minimum crafts: we maximize b in 2a + 3b = halfNValue
        // so b_maximum = halfNValue / 3, then find corresponding a = (halfNValue - 3b) / 2
        long minCrafts = findMinCrafts(halfNValue);

        // For maximum crafts:  we maximize a in 2a + 3b = halfNValue
        // a_maximum = halfNValue / 2, then find corresponding b = (halfNValue - 2a) / 3
        long maxCrafts = findMaxCrafts(halfNValue);

        if(minCrafts == -1 || maxCrafts == -1){
            return new long[]{-1, -1};
        }

        return new long[]{minCrafts, maxCrafts};
    }

    public static long findMinCrafts(long halfNValue){
        // here we are finding largest b such that (halfNValue - 3b) is non-negative and even
        long b = halfNValue / 3;
        while(b >= 0){
            long remainder = halfNValue - 3 * b;
            if(remainder >= 0 && remainder % 2 == 0){
                return b + (remainder / 2); // b + a => here a = (halfNValue - 3b) / 2
            }
            b--;
        }
        return -1;
    }

    public static long findMaxCrafts(long halfNValue){
        // here we are finding largest a such that (halfNValue - 2a) is non-negative and divisible by 3
        long a = halfNValue / 2;
        while(a >= 0){
            long remainder = halfNValue - 2 * a;
            if(remainder >= 0 && remainder % 3 == 0){
                return a + (remainder / 3); // a + b => here b = (halfNValue - 2a) / 3
            }
            a--;
        }
        return -1;
    }

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter number of test cases(1 ≤ t ≤ 1000):");
        int t = sc.nextInt();

        for(int i = 0; i < t; i++){
            System.out.println("Enter total number of propulsion units(1 ≤ n ≤ 10¹⁸):");
            long n = sc.nextLong();

            long[] result = solveMinMaxCrafts(n);

            if(result[0] == -1){
                System.out.println(-1);
            }else{
                System.out.println(result[0] + " " + result[1]);
            }
        }

        sc.close();
    }
}
