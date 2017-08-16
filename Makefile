MAJOR_VERSION := 1
MINOR_VERSION := 0.0

OUT_MIN := zoom-${MAJOR_VERSION}.${MINOR_VERSION}.min.js
OUT := zoom-${MAJOR_VERSION}.${MINOR_VERSION}.js

.PHONY: all clean distclean

all: ${OUT_MIN} ${OUT}

clean:
	rm -f ${OUT}
	rm -f ${OUT_MIN}

distclean: clean
	rm -f closure-compiler-v20151216.jar

closure-compiler-v20151216.jar:
	wget -q -O $@ http://search.maven.org/remotecontent?filepath=com/google/javascript/closure-compiler/v20151216/closure-compiler-v20151216.jar

${OUT_MIN}: ${OUT} closure-compiler-v20151216.jar
	java -jar closure-compiler-v20151216.jar --compilation_level ADVANCED_OPTIMIZATIONS --js $< --js_output_file $@ 

${OUT}: zoom.js
	cp $< $@
