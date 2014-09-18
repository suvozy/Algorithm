#include<iostream.h>
#include<math.h>
#include<conio.h>
#include<string.h>
int a[25000];
int main(){
int tc,z=0,no,f=0,count=0,x[200];
cin>>tc;
while(tc>0)
{
	cin>>no;
	for(int i=0;i<(2*no-2);i++)
	cin>>a[i];

	for(int k=0;k<2*(no-1);k++)
	{
		for(int j=k+1;j<2*(no-1);j++)
		{	if(a[j]==a[k])
			count++;
		}
		if(count>=f)
		{ 	f=count;
			count=0;
			x[z]=a[k];
         z+=1;
		}

	}
	x[z]=-1;z+=1;
	tc-=1;
}

for(int i=0;i<z;i++)
{if(x[i]==-1) cout<<"\n";
else cout<<x[i]<<" "; }

return 0;

}
