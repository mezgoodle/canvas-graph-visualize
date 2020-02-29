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
            double[,] matrix_oriented = new double[100, 100];
            double[,] matrix_non_oriented = new double[100, 100];

            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    matrix_oriented[i,j] = Math.Floor((Convert.ToDouble(rand.Next(200))/100) * (1.0 - n3 * 0.02 - n4 * 0.005 - 0.25));

            for (int i = 0; i < n; i++)
                    for (int j = 0; j <= i; j++) 
                    {
                        matrix_non_oriented[i,j] = Math.Floor((Convert.ToDouble(rand.Next(200))/100) * (1.0 - n3 * 0.02 - n4 * 0.005 - 0.25));
                        matrix_non_oriented[j, i] = matrix_non_oriented[i, j];
                    }

            WriteArray("Oriented", matrix_oriented);
            WriteGraph("Oriented", matrix_oriented);
            WriteArray("Non-Oriented", matrix_non_oriented);
            WriteGraph("Non-Oriented", matrix_non_oriented);
        }
    }
}
