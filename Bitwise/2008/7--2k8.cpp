/*   this program Helps Bubba put the pictures in the album in the right order.
1. find out the maximum no. in the given set of a case and store it in y,
	then y is incremented by 1 .

2. now we calculate x ,which stores the min no. in a given case.

3. in the iteration m,we find out the position of the min value
	and replace it with y .

4. the position of min value is stored in array b,each case is followed by -1.

5. finally we print the array b which contain the result.


*/
#include<iostream.h>
int main()
{long a[100],b[100];
int n,p,z=0;
long x,y=0;
cin>>n;

for(int i=0;i<n;i++)
{ cin>>p;
	for(int j=0;j<p;j++)
		{cin>>a[j]; if(a[j]>y) y=a[j];} y++;


	for(int l=0;l<p;l++)
	{	x=a[0];
				for(int k=0;k<p;k++)
					if(a[k]<x && a[k]!=y)	x=a[k];


		for(int m=0;m<p;m++)
			{ 	if(a[m]==x)
				{b[z]=m;
				a[m]=y;
				z++;break;}
			}
	}
	b[z]=-1;z++;

}

for(int h=0;h<z;h++)
	if(b[h]!=-1)	cout<<b[h]+1<<" ";
	else cout<<"\n";


return 0;
}