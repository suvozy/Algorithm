```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <list>
#include <string>

#define FOR(i, a, b)	for(int i = a; i < b; i++)
#define REP(i, n)		FOR(i, 0, n)

#define REV(n)			((n % 10) * 10 + (n / 10))

using namespace std;

int main()
{
	int dates[] = {0,31,28,31,30,31,30,31,31,30,31,30,31};
	vector<int> rmm, rdd;

	FOR(i, 1, 32)
	{
		if(i <= 12) rmm.push_back(REV(i));
		rdd.push_back(REV(i));
	}
	sort<vector<int>::iterator>(rmm.begin(), rmm.end());
	sort<vector<int>::iterator>(rdd.begin(), rdd.end());

	int mm, dd, yy1, yy2;

	cin >> mm >> dd >> yy1 >> yy2;

	int y1, y2;
	REP(i, 12) if(yy2 == rmm[i]) { y2 = i; break; }
	REP(i, 31) if(yy1 == rdd[i]) { y1 = i; break; }

	while(true)
	{
		y2 -= 1;
		if(y2 == -1) { y2 = 11; y1 -=1; }

		yy2 = rmm[y2];
		yy1 = rdd[y1];
		mm = REV(yy2);
		dd = REV(yy1);

		if(mm != 2 && dd <= dates[mm]) break;
		if(mm == 2 && dd <= (yy2 % 4 == 0 ? 29 : 28)) break;
	}

	if(mm < 10) cout<<"0"; cout << mm << " ";
	if(dd < 10) cout<<"0"; cout << dd << " ";
	if(yy1 < 10) cout<<"0"; cout << yy1 << " ";
	if(yy2 < 10) cout<<"0"; cout << yy2;

	//system("pause");	
	return 0;
}
```
----------------------------------------------------------------------------------
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <list>
#include <string>

#define FOR(i, a, b)	for(int i = a; i < b; i++)
#define REP(i, n)		FOR(i, 0, n)

using namespace std;

struct node
{
	int n;
	node *l, *r;
};

int main()
{
	node *s = NULL;

	REP(i, 3)
	{
		node *t = (node*)malloc(sizeof(node));
		cin >> t->n;
		t->l = t->r = NULL;

		if(s == NULL) s = t;
		else
		{
			node *p = s;
			while(true)
				if(t->n < p->n) { if(p->l == NULL) { p->l=t; break; } p = p->l; }
				else if(t->n > p->n) { if(p->r == NULL) { p->r=t; break; } p = p->r; }
		}
	}

	node *dl = NULL;

	while(s != NULL)
	{
		node *l = s->l, *r = s->r;
		
		if(r == NULL) r = l;
		else
		{
			node *p;
			for(p = r; p->l != NULL; p = p->l);
			p->l = l;
		}

		s->l = NULL; s->r = dl;
		dl = s;

		s = r;
	}

	for(node *p = dl; p != NULL; p = p->r) cout << p->n << " ";

	return 0;
}
```
---------------------------------------------------------------------------------
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <list>
#include <string>

#define FOR(i, a, b)	for(int i = a; i < b; i++)
#define REP(i, n)		FOR(i, 0, n)

using namespace std;

struct node
{
	int n;
	node *l, *r;
} *s = NULL;

void addNode()
{
	node *t = (node*)malloc(sizeof(node));
	cin >> t->n;
	t->l = t->r = NULL;

	if(s == NULL) s = t;
	else
	{
		node *p = s;
		while(true)
			if(t->n < p->n) { if(p->l == NULL) { p->l=t; break; } p = p->l; }
			else if(t->n > p->n) { if(p->r == NULL) { p->r=t; break; } p = p->r; }
	}
}

int main()
{
	REP(i, 3) addNode();

	return 0;
}
```
