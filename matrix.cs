using System;

public class Test
{
	public static void Main()
	{
		int n = 11;
		bool oriented = false;
		int[,] myArr = new int[n, n];
		
		Random ran = new Random(9312);

		if (oriented)
		{
			for (int i = 0; i < n; i++)
			{
			    for (int j = 0; j < n; j++)
			    {
			       myArr[i, j] = ran.Next(0, 2);
			       Console.Write("{0}\t", myArr[i, j]);
			    }
			    Console.WriteLine();
			}
		}
		else
		{
		    int tmp = 0;
		    for (int i = 0; i < n; i++)
			    {
			       for (int j = tmp; j < n; j++)
				    {
				       myArr[i, j] = ran.Next(0, 2);
				       myArr[j, i] = myArr[i, j];
				    }
				    tmp++;
			    }
	    	for (int i = 0; i < n; i++)
			{
			    for (int j = 0; j < n; j++)
			    {
			       Console.Write("{0}\t", myArr[i, j]);
			    }
			    Console.WriteLine();
			}
		}
	}
}