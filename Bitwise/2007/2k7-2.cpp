#include<iostream.h>
#include<conio.h>
#define max 999
int x[max],y[max];
int main(){
	int s;
	cin>>s;
	int n=0;
	do{	cin>>x[n]>>y[n];
		n+=1;
	}while(x[n-1]!=-1);
	n-=2;

	int end=n,coin=0,sum=s;
	int a=s/x[end];	///CONST QUO

	while(sum!=0)
	{	sum=s;
		while(a<y[end])
		{	end-=1;	a=s/x[end];	}
		int b=a;	 		///CHANGING QUO
		for(int i=end;i>=0;i--)
		{  if(b>=y[i])
			{sum-=b*x[i];
			coin+=b;}
			b=sum/x[i-1];
		}
		if(sum!=0)
		{	a-=1;		coin=0;		}
	}

	cout<<coin;
return 0;
}
