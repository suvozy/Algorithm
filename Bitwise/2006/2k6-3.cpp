#include<iostream.h>
#include<conio.h>
#define max 2500
int lamp[max],gem[max];
int list[max];
int k,n,e;
int enlit(void)
{	int x=1,inc=0,m=1;
	while( (gem[n]+inc)<=(lamp[k]+e) )
	{	m=1;
		for(int i=1;i<=k;i++)
			if( (gem[m]+inc)<=(lamp[i]+e) && (gem[m]+inc)>=(lamp[i]-e) )
				m+=1;
		if(n==(m-1))	return 1;
		if(n!=(m-1))
		{	if( (gem[1]+inc)>=(lamp[x]-e) && (gem[1]+inc)<(lamp[x]+e) )
				inc+=1;
			else if( (gem[1]+inc)>=(lamp[x]+e) )
				{x+=1;	inc+= lamp[x]-e-(gem[1]+inc);}
			else if( (gem[1]+inc)<(lamp[x]-e) )
				inc+= lamp[x]-e-(gem[1]+inc);
		}
	}
	return 0;
}
int main(){
	int test;
	cin>>test;
	for(int i=1;i<=test;i++)
	{	cin>>k>>n>>e;
		for(int j=1;j<=k;j++)
		cin>>*(lamp+j);
		for(j=1;j<=n;j++)
		cin>>*(gem+j);

		list[i]=enlit();
	}
	for(i=1;i<=test;i++)
		if(list[i]==1)	cout<<"YES \n";
		else	cout<<"NO \n";
return 0;
}

