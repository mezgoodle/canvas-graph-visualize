using System;

namespace matrix
{
    class Program
    {
        static void Main(string[] args)
        {
            static void WriteArray(string str, double[,] array, int n = 11)
            {
                Console.WriteLine(str);
                for (int i = 0; i < n; i++)
                {
                    for (int j = 0; j < n; j++)
                        Console.Write(array[i, j] + " ");
                    Console.WriteLine();
                }
                Console.WriteLine();
            }

            static void WriteGraph(string str, double[,] array, int n = 11)
            {
                Console.WriteLine(str);
                if (str == "Oriented")
                {
                    for (int i = 0; i < n; i++)
                        for (int j = 0; j < n; j++)
                            if (array[i,j] == 1)
                                Console.WriteLine("[" + (i+1) + "," + (j+1) + "],");       
                } else
                {
                    for (int i = 0; i < n; i++)
                        for (int j = 0; j <= i; j++)
                            if (array[i,j] == 1)
                                Console.WriteLine("[" + (i+1) + "," + (j+1) + "],");
                }
                Console.WriteLine();
            }
            Random rand = new Random(9312);
            int n = 11, n3 = 1, n4 = 2;
            double[,] matrix_non_oriented = new double[100, 100];
            double[,] w = new double[100, 100];
            double[,] wt = new double[100, 100];
            bool[,] b = new bool[100, 100];

            // Only matrix
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++) 
                    matrix_non_oriented[i,j] = Math.Floor((Convert.ToDouble(rand.Next(200))/100) * (1.0 - n3 * 0.01 - n4 * 0.005 - 0.05));
            
            WriteArray("Non-Oriented", matrix_non_oriented);

            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    if (matrix_non_oriented[i,j] != 0)
                        matrix_non_oriented[j,i] = matrix_non_oriented[i,j];

            // Create matrix of weights
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                {
                    wt[i,j] = Math.Round(Convert.ToDouble(rand.Next(100))) * matrix_non_oriented[i, j];
                    if (wt[i,j] == 0)
                        b[i,j] = false;
                    else b[i,j] = true;
                }
            for (int i = 0; i < n; i++)
                for (int j = 0; j <= n; j++) 
                {
                    int varB1 = b[i,j] ? 1 : 0;
                    int varB2 = b[j,i] ? 1 : 0;
                    int varB21 = b[j,i] ? 0 : 1;
                    int var1 = 0, var2 = 0, var3 = 0;
                    if (varB1 == 1 && varB21 == 1) var1 = 1; else var1 = 0;
                    if (varB1 == 1 && varB2 == 1) var2 = 1; else var2 = 0;
                    if (i > j) var3 = 1; else var3 = 0;
                    wt[i,j] *= var1 + var2 + var3;
                }
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    w[i,j] = wt[i,j] + wt[j,i];
            // Output
            WriteArray("Non-Oriented", matrix_non_oriented);
            WriteGraph("Non-Oriented", matrix_non_oriented);
            WriteArray("W", w);
            // WriteArray("b", b);
        }
    }
}
