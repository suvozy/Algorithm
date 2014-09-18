#include<iostream.h>
int prime(int);
prime(int fact)
{	int f=0;
	for(int i=2;i<=(fact/2);i++)
		if(fact%i==0)	{f=1;break;}

	if(f==0 || fact==2)	return 1;/////////prime
	else	return 0;					/////////nt prime
}

void main()
{int a,n,x[999],y[999];
cin>>a;
for(int i=0;i<a;i++)	cin>>x[i];
cin>>n;int z=n-1;
int k=2,b=0,c=0;
	while(n>0)
	{  b=0;
		for(i=2;i<=k;i++)
			if(k%i==0 && prime(i)==1)
				{for(int j=0;j<a;j++)
					if(i==x[j])	b=1;
				if(b==0)	break;
				}
		if(b==1)	{y[c]=k;c++;n--;}
		k++;
	}
cout<<y[z];

}

