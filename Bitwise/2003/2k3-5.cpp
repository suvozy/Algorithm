#include<iostream.h>
#include<math.h>
#include<conio.h>
#include<string.h>

int main(){
int n;
cin>>n;
if(n%2==1)	n=0;
for(int i=2;i<=(n-2);i+=3)	cout<<i<<" ";
for(int j=3; j<=(n-2) && j<=(i-3) ;j+=4)	cout<<j<<" ";
cout<<"-1";

return 0;
}
