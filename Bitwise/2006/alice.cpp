#include<iostream.h>
#include<math.h>
#include<conio.h>
#include<string.h>
#define max 2500
int plot[max],n;
int big();
int main()
{
	int level[1000],large,diff=0,k=0;
	cin>>n;
	for(int i=0;i<n;i++)
		cin>>*(plot+i);

	large=big();
	for(i=0;i<n;i++)
	{  k=i+1;
		if(i+1==n)
			k=0;
		if(*(plot+i)<large && *(plot+(k))<large)
		{  	if(*(plot+i)>*(plot+k))
					diff=large-*(plot+i);
				else
					diff=large-*(plot+k);
				
			*(plot+i)+=diff;
			*(plot+(k))+=diff;
			*(level+i)=diff;
		}
		else level[i]=0;
	}
	int flag=0;
	for(i=0;i<n;i++)
		if(*(plot+i)!=large)
		{	flag=1;break;}

	if(flag)
	 for(i=0;i<n;i++)
	 cout<<"-1"<<" ";
	else
	for(i=0;i<n;i++)
	cout<<*(level+i)<<" ";
	return(0);
}

int big ()
{	int large=*(plot+0);
	for(int i=1;i<n;i++)
	if(large<*(plot+i))
	large=*(plot+i);
	return(large);
}

