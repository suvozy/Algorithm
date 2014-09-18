#include<iostream.h>
#include<math.h>
#include<conio.h>
#include<string.h>

int main(){
int n;
cin>>n;
int a=0,b;

if(n==2 || n==3)	cout<<"-1";
else	{b=n-1;
		if(n%2==0)	a=(n/2)-1;	///EVEN
		else			a=n/2;		///ODD

		for(int i=1;i<=(n/2);i++){
		cout<<a<<"\n"<<b<<"\n";
		a-=1;	b-=1;
		}
}
if(n%2==1 && n!=3)	cout<<a;		///ODD

return 0;
}
