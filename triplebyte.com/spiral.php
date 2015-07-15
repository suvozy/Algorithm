/*
input:
f(n)
n=15

output:
***************
              *
************* *
*           * *
* ********* * *
* *       * * *
* * ***** * * *
* * *   * * * *
* * * *** * * *
* * *     * * *
* * ******* * *
* *         * *
* *********** *
*             *
***************
*/

<pre>
<?php
$n = 50;
$out = array();

for ($i=0; $i<$n; $i++) for ($j=0; $j<$n; $j++) $out[$i][$j] = ' ';

function draw(&$out, $i1, $j1, $i2, $j2)
{
  for ($i=min($i1, $i2); $i <= max($i1, $i2); $i++)
  {
    for ($j=min($j1, $j2); $j <= max($j1, $j2); $j++)
    {
      $out[ $i ][ $j ] = '*';
    }
  }
}

function travel(&$out, $n = 0, $i = 0, $j = 0, $depth = 1)
{
  // $is_inner = ($depth == 0) ? 0 : 2;

  // ->
  draw($out, $i,$j, $i,$j+($n-1));
  $j += $n-1;

  // down
  draw($out, $i,$j, $i+($n-1),$j);
  $i += $n-1;

  // <-
  draw($out, $i,$j, $i,$j-($n-1));
  $j -= $n-1;

  // up
  draw($out, $i,$j, $i-($n-3),$j);
  $i -= $n-3;

  $j += 1;
  draw($out, $i,$j, $i,$j);

  // if ($depth == 2) return;
  if ($n-4 < 0) return;

  $depth++;
  travel($out, $n-4, $i, $j+1, $depth++);
}

travel($out, $n);

for ($i=0; $i<$n; $i++)
{
  for ($j=0; $j<$n; $j++) echo $out[$i][$j];
  echo "\n";
}
?>
</pre>
