#include<iostream.h>
void main()
{
char o1[5][6]={'u','l','r','l','r','u',
					'd','u','u','l','r','d',
					'u','d','d','u','l','r',
					'd','l','r','d','u','u',
					'l','r','l','r','d','d'			};
//char o2[5]={};
//char o[5][500],e[6][2000];


char e1[6][5]={	'l','r','l',	'r','l',
						'u','u','l',	'r','l',
						'd','d','u',	'l','r',
						'l','r','d',	'u','u',
						'u','l','r',	'd','d',
						'd','l','r',	'l','r',};

char e2[6][3]={'r', 'u', 'u',
					'r', 'd', 'd',
					'u','l','r',
					'd','l','r',
					'l','r','u',
					'l','r','d' } ;


int a[1000][2],n,b;
cin>>n;
for(int i=0;i<n;i++) cin>>a[i][0]>>a[i][1];

for(int k=0;k<n;k++) /////////////cases
{int x=a[k][0],y=a[k][1]*2;
if(x==y || x<5 || y<3) continue;
if(x%2!=0)
	for(i=0;i< x ;i++)
	{	for(int j=0;j< y ;j++)
		{	if(j<=4 && i<=3) cout<<o1[i][j];
			if(j==(y-1) && i<=3) cout<<o1[i][5];
			if(j<=4 && i==(x-1)) cout<<o1[4][j];
			if(j==(y-1) && i==(x-1)) cout<<o1[4][5];
			if(j>4 && j<(y-1))
					{if(i<=3 || i==(x-1))
					{if(i==2) cout<<"rl";
					else cout<<"lr";j++;}}
			if(i>3 && i<(x-1))
					{if(j==4 || j==(y-1))
						{if(i%2==0) cout<<'d';else cout<<'u';}
					else
						{if(i%2!=0) cout<<'d';else cout<<'u';}
					}
		}cout<<"\n";
	}///////////////////////////////////odd
if(x%2==0 && y==6)
	for(i=0;i< x ;i++)
	{	for(int j=0;j< 6 ;j++)
		{	if(j<3 && i<=4) cout<<e1[i][j];
			if(j>2 && i<=4) cout<<e2[i][j-3];
			if(j<3 && i==(x-1)) cout<<e1[5][j];
			if(j>2 && i==(x-1)) cout<<e2[5][j-3];
			if(i>4 && i<(x-1))
				{if(j==0 || j==(5))
					{if(i%2!=0) cout<<'d';else cout<<'u';}
				else
					{if(i%2==0) cout<<'d';else cout<<'u';}
				}
		}cout<<"\n";
	}
if(x%2==0 && y!=6)
	for(i=0;i< x ;i++)
	{	for(int j=0;j< y ;j++)
		{	if(j<5 && i<=4) cout<<e1[i][j];
			if(j>(y-4) && i<=4) cout<<e2[i][j-(y-3)];
			if(j<5 && i==(x-1)) cout<<e1[5][j];
			if(j>(y-4) && i==(x-1)) cout<<e2[5][j-(y-3)];
			if(j>4 && j<(y-3))
					{if(i<=4 || i==(x-1))
					{if(i==0 && i==1) cout<<"rl";
					else cout<<"lr";j++;}}
			if(i>4 && i<(x-1))
				{if(j==0 || j==(y-1))
					{if(i%2!=0) cout<<'d';else cout<<'u';}
				else
					{if(i%2==0) cout<<'d';else cout<<'u';}
				}
		}cout<<"\n";
	}

cout<<"0\n";

}    ////cases

}////////////////end
