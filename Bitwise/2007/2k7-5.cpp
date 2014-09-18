#include<iostream.h>
#include<math.h>
#include<conio.h>
#define max 999
long x[max];
long change2(int p)
{	long e=1,s=0,f;
	for(int i=1;i<=(p-1);i++)
	{	e=1;
		f=pow(i,e);
		while( f%p!=1)
		{	e+=1;f=pow(i,e);	}
		s+=e;
	}
	return s;
}
int isprime(int n){ 		//// 1 -prime	0 -NOT
	int flag=1;
	for(int i=2;i<=(n/2);i++)
		if(n%i==0)		{flag=0;break;}
	return flag;
}
int main(){
	int p,test;	long n,s;
	cin>>test;
	for(int i=1;i<=test;i++)
	{	cin>>p;s=0;

		if(isprime(p)==1 && p%2==1)
			s=change2(p);

		x[i-1]=s;
	}
	for(i=0;i<test;i++)	cout<<x[i]<<"\n";
return 0;
}
