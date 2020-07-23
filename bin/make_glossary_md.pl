#!/usr/bin/perl -w
# Write a md glossary file from stdin tsv file containing:
# keyword[,keyword]<tab>Definition
# Master copy: https://docs.google.com/spreadsheets/d/1KUL-dcfBrR3bWsFUcugy5SsJcR5ot-P4Bt27z3ka0x0/edit#gid=0
# Export this sheet as tab-separated values into source/_res/glossary.tsv
# Usage:
# cat source/_res/glossary.tsv | bin/make_glossary_md.pl > source/glossary-terminology.md

use File::Basename;
my $prog = basename($0);

print ".. CREATED BY $prog - DO NOT EDIT!\n\n";
# Local styling adjustments
print "<!-- Local style adjustments -->\n<style>div.section dl.glossary dt {font-weight: bold; font-size: 1.3em;}\n      div.section dd {margin-top: 10px; margin-bottom: 10px; margin-left: 30px;}\n</style>\n\n";

print "# Glossary\n\n";

while (<STDIN>) {
   chomp;
   my @parts = split("\t");
   my @keys = split(",",$parts[0]);
   my $bm = "";

   foreach my $kw (split (",",$parts[0])) {
       $bm = $kw;
       $bm =~ s/([[:upper:]])/lc $1/eg;
       $bm =~ s/([[:space:]])/\-/g;
       print "## $kw\n\n";
   }
   print "$parts[1]\n\n";
 }
