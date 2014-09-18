#include<iostream.h>
#define max 1998
void cal_fre(void);
void display(void);
int n,e=0;
int x[max],y[max],z[max];

void display()
{	for(int i=0;i<e;i++)
	{	if(z[i]==-1)	cout<<"\n";
		else	cout<<z[i]<<" ";
	}
}

void cal_fre()
{	int freq=0;
	for(int i=0;i<=(n-1);i++)
	{	freq=0;
		for(int j=1;j<=2*(n-1);j++)
		{	if(x[j]==i)	freq+=1;	}
		y[i]=freq;
	}
	int large=y[0];
	for(i=0;i<=(n-1);i++)
		if(y[i]>large)
		large=y[i];
	for(i=0;i<=(n-1);i++)
		if(y[i]==large)
		{	z[e]=i;	e+=1;	}

	z[e]=-1;	e+=1;
}


int main(){
	x[0]=-1;
	int test;
   cin>>test;
	for(int i=1;i<=test;i++)
	{	cin>>n;
		for(int j=1;j<=(2*(n-1));j++)
			cin>>x[j];
		cal_fre();
	}
display();
return 0;
}
