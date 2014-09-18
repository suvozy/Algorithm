#include<iostream.h>
#include<math.h>
#include<conio.h>
#include<string.h>
void off(int);
void on(int);

int main(){
int n;
cin>>n;
off(n);
return 0;
}
void off(int n){
	if(n==1)	cout<<"-1\n";
	if(n==2)	cout<<"-2 \n-1 \n";
	if(n>2)	{off(n-2);
			cout<<"-"<<n<<"\n";
			on(n-2);off(n-1);}
}
void on(int n){
	if(n==1)	cout<<"+1\n";
	if(n==2)	cout<<"+1 \n+2 \n";
	if(n>2)	{on(n-1);
			off(n-2);cout<<"+"<<n<<"\n";
			on(n-2);}
}
