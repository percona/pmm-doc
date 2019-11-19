# Documentation 

## Install 

1.	Installing Sphinx. We use v.1+ on production. If you can, install 1.6+, but a higher version will do. [Official instructions](https://www.sphinx-doc.org/en/master/usage/installation.html) 

	For Mac

		brew install sphinx-doc

		export PATH="/usr/local/opt/sphinx-doc/bin:$PATH"

	Check the installation::

		sphinx-build --version
		sphinx-build 2.2.

2.	Make a fork of the pmm-doc repository, then make git clone of your repository locally.

3.	Run the documentation build.
		
		make html

	You may need to comment on the line `@sed -i 's/{{ toc }}/{ toctree\(false\)"` in the Make file.

	Check result:

		copying images... [100%] .res/graphics/png/pmm.home-page.png
		copying static files... ... done
		copying extra files... done
		dumping search index in English (code: en)... done
		dumping object inventory... done
		build succeeded, 1319 warnings.

		The HTML pages are in build/html.

		Build finished. The HTML pages are in build/html.

	You can see a lot of Warnings. This is normal.

4.	Open the documentation in your browser. The documentation is compiled in the `/build/html/` folder.
	
	You can simply open "/build/html/index.html" in your browser. 

	Or use Docker

		docker run -dit --name my-apache-app -p 8080:80 -v "$PWD"/build/html/:/usr/local/apache2/htdocs/ httpd:2.4

5.	Check the documentation. It's going to be built without make-up because it's going to use percona.com's make-up.

	![Result](/images/img-readme-result.png)
