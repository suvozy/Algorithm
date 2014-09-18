#include<iostream.h>
#include<math.h>
#include<conio.h>
#include<string.h>

int isprime(int n){ 		//// 0 -prime	1 -NOT
int flag=0;
for(int i=2;i<=(n/2);i++)
	if(n%i==0)	{flag=1;break;}
if(n==2 || n==1)	return 0;
else	return flag;
}

int prime2each(int a,int b){ 	////0 -yes	1 -NO
int k,flag=0;
if(a<b)	k=a/2;
else	k=b/2;

for(int i=2;i<=k;k++)
	if(a%i==0 && b%i==0)
	{flag=1;break;}
if(a==1 || b==1) return 0;
else if(a%b==0 || b%a==0) return 1;
else return flag;
}

int main(){
int k,lz,lxy;
int count=0;
cin>>k>>lz;

if( isprime(k)==0 ){
	if( (k-1)%4==0 || (k-3)%4==0 ){

			for(int z=1;z<=lz;z++){
				if( isprime(z)==0 && (z-1)%4==0)
					lxy=pow( (k*z*z),.5 );
				else	lxy=0;

				for(int x=1;x<=lxy;x++)
				{for(int y=(x+1);y<=lxy;y++)
						{if(prime2each(x,y)==0 && prime2each(y,z)==0 && prime2each(z,x)==0)
						if( ((x*x)+(y*y)) == (k*z*z) )
						count+=1;
						}
				}
}	}		}


cout<<count;
return 0;
}
