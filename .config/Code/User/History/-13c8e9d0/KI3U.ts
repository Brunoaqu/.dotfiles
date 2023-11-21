/*
For future reference, this is the code that was used to setup tracing in the backend, and it was based
on the following example: https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node/opentelemetry-instrumentation-express/examples.
Eslint is disabled to follow the original code as closely as possible.

Ignore the deprecation warning.

Never ever change this code, trust me.
*/

/* eslint-disable */
'use strict';

import { Sampler, SpanKind } from "@opentelemetry/api";

const opentelemetry = require('@opentelemetry/api');

// Not functionally required but gives some insight what happens behind the scenes
const { diag, DiagConsoleLogger, DiagLogLevel } = opentelemetry;
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

import { AlwaysOnSampler } from '@opentelemetry/core';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { Resource } from '@opentelemetry/resources';
import { SemanticAttributes, SemanticResourceAttributes as ResourceAttributesSC } from '@opentelemetry/semantic-conventions';
import { SpanAttributes } from "@opentelemetry/api/build/src/trace/attributes";
const { TraceExporter } = require("@google-cloud/opentelemetry-cloud-trace-exporter");

import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { isProduction } from "../../../config";
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { MySQL2Instrumentation } = require('@opentelemetry/instrumentation-mysql2');
const { BunyanInstrumentation } = require('@opentelemetry/instrumentation-bunyan');

export const setupTracing = (serviceName: string) => {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [ResourceAttributesSC.SERVICE_NAME]: serviceName,
    }),
    sampler: filterSampler(ignoreHealthCheck, new AlwaysOnSampler()),
  });
  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      // Express instrumentation expects HTTP layer to be instrumented
      HttpInstrumentation,
      ExpressInstrumentation,
      new BunyanInstrumentation(),
      new MySQL2Instrumentation()
    ],
  });

  if (isProduction) {
    provider.addSpanProcessor(new SimpleSpanProcessor(new TraceExporter()));
  }
  // provider.addSpanProcessor(new SimpleSpanProcessor(new JaegerExporter()));

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register();

  return opentelemetry.trace.getTracer(serviceName);
};

type FilterFunction = (spanName: string, spanKind: SpanKind, attributes: SpanAttributes) => boolean;

function filterSampler(filterFn: FilterFunction, parent: Sampler): Sampler {
  return {
    shouldSample(ctx, tid, spanName, spanKind, attr, links) {
      if (!filterFn(spanName, spanKind, attr)) {
        return { decision: opentelemetry.SamplingDecision.NOT_RECORD };
      }
      return parent.shouldSample(ctx, tid, spanName, spanKind, attr, links);
    },
    toString() {
      return `FilterSampler(${parent.toString()})`;
    }
  }
}

function ignoreHealthCheck(spanName: string, spanKind: SpanKind, attributes: SpanAttributes) {
  return spanKind !== opentelemetry.SpanKind.SERVER || attributes[SemanticAttributes.HTTP_ROUTE] !== "/health";
}

