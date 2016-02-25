
.PHONY: all clean distclean

all: zoom.min.js

clean:
	rm -f zoom.min.js

distclean: clean
	rm -f jquery-1.9.js closure-compiler-v20151216.jar

jquery-1.9.js:
	wget -q -O $@ https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/jquery-1.9.js

closure-compiler-v20151216.jar:
	wget -q -O $@ http://search.maven.org/remotecontent?filepath=com/google/javascript/closure-compiler/v20151216/closure-compiler-v20151216.jar

zoom.min.js: zoom.js closure-compiler-v20151216.jar jquery-1.9.js
	java -jar closure-compiler-v20151216.jar --compilation_level ADVANCED_OPTIMIZATIONS --js $< --externs jquery-1.9.js --js_output_file $@ 
