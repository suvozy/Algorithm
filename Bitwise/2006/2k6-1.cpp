#include<iostream.h>
#include<math.h>
#include<conio.h>
#define max 2500
int a[max],x[max];
int largest(int n)
{	int l;l=a[0];
	for(int i=0;i<n;i++)
		if(a[i]>l)	l=a[i];
	return l;
}
void moves(int l,int n)
{	for(int i=0;i<=(n-1);i++)
	{	int k=i+1;
		if(k==n)	k=0;
		if(a[i]<l && a[k]<l)
		{	if(a[i]>a[k])
			{	x[i]=l-a[i];
				a[k]+=x[i];
				a[i]=l;
			}
			else
			{	x[i]=l-a[k];
				a[i]+=x[i];
				a[k]=l;
			}
		}
	}
}
int main(){
	int test,n;
	cin>>test;
	for(int i=1;i<=test;i++)
	{	cin>>n;
		for(int j=0;j<n;j++)
			cin>>a[j];
		moves(largest(n),n);
		for(j=0;j<n;j++)
			cout<<x[j]<<" ";
	}
return 0;
}
