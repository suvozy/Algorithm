/*  this is the program which decodes the  Scrooge's new piggy bank.
1. match if the number is of the form 3t+1 and the no.is evrn or not.

2. if the above code matches then we will search for a & b .

3.  a & b are selected such that they satisfy the condition
	 a^2+b^2-ab= number on the safe.
*/

#include<iostream.h>
void main()
{
long a[1000];
int n,e=0,f=0;
cin>>n;

for(int i=0;i<n;i++)
cin>>a[i];

for(i=0;i<n;i++)
{  e=0;f=0;
	if( (a[i]-1)%3 == 0  && a[i]%2!=0)
	{for(int j=2;j<a[i];j++)
		for(int k=0;k<a[i];k++)
			if(	((j*j) + (k*k) - (j*k)) == a[i]	&& (j+k)>(e+f)	)
				{e=j;f=k;}


	 cout<<"\n"<<a[i]<<" "<<e<<" "<<f;
	}
}

}
