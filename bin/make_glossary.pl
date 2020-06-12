#!/usr/bin/perl -w
# Write a rst glossary file from stdin tsv file containing:
# keyword[,keyword]<tab>Definition
# Master copy: https://docs.google.com/spreadsheets/d/1KUL-dcfBrR3bWsFUcugy5SsJcR5ot-P4Bt27z3ka0x0/edit#gid=0
# Export this sheet as tab-separated values into source/_res/glossary.tsv
# Usage: 
# cat source/_res/glossary.tsv | bin/make_glossary.pl > source/glossary-terminology.rst

use File::Basename;
my $prog = basename($0);

print ".. CREATED BY $prog - DO NOT EDIT!\n\n";
print ".. _pmm.glossary-terminology-reference:\n\n";
print "########\nGlossary\n########\n\n";
print ".. glossary::\n";
print "   :sorted:\n\n";

while (<STDIN>) {
   chomp;
   my @parts = split("\t");
   my @keys = split(",",$parts[0]);

   foreach my $kw (split (",",$parts[0])) {
     print "   $kw\n";
   }
   print "      $parts[1]\n";
   
   print "\n";

 }
